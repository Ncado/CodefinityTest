import {BashCommands} from "./bash";


export class Container {
    image: any;
    private CLONE_NEWUTS: any;
    private CLONE_NEWIPC: any;
    private CLONE_NEWPID: number;
    private CLONE_NEWNET: number;
    private CLONE_NEWNS: number;
    private CLONE_NEWUSER: number;

    constructor(image: any) {
        this.image = image;
    }

    async initializeNamespaces() {
        // clone()  create a new process with its own namespaces.
        let flags = this.CLONE_NEWUTS | this.CLONE_NEWIPC | this.CLONE_NEWPID | this.CLONE_NEWNET | this.CLONE_NEWNS | this.CLONE_NEWUSER;


        //creates a new process
        const newProcessID = BashCommands.clone(flags);

        if (newProcessID < 0) {
            throw new Error("Failed to clone process and create namespaces");
        } else {



            // set up the isolated environment for each namespace with unshare

            const utsResult = BashCommands.unshare(this.CLONE_NEWUTS);
            const ipcResult = BashCommands.unshare(this.CLONE_NEWIPC);
            const pidResult = BashCommands.unshare(this.CLONE_NEWPID);
            const netResult = BashCommands.unshare(this.CLONE_NEWNET);
            const nsResult = BashCommands.unshare(this.CLONE_NEWNS);
            const userResult = BashCommands.unshare(this.CLONE_NEWUSER);


            if (utsResult < 0 || ipcResult < 0 || pidResult < 0 || netResult < 0 || nsResult < 0 || userResult < 0) {
                throw new Error("Failed to unshare one or more namespaces");
            }

        }
    }

    async initializeCgroups(uniqueContainerId) {



        let cgroupName = `my_cgroup_${uniqueContainerId}`;

        //new cgroup for this container
        BashCommands.mkdir(`/sys/fs/cgroup/${cgroupName}`);

        // Limit CPU usage to 50%
        BashCommands.writeFile(`/sys/fs/cgroup/${cgroupName}/cpu.shares`, '512'); // (1024 is full CPU usage, so 512 is 50%)

        // Limit memory usage to 1GB
        BashCommands.writeFile(`/sys/fs/cgroup/${cgroupName}/memory.limit_in_bytes`, '1073741824');


        // Add the new process to the cgroup
        BashCommands.writeFile(`/sys/fs/cgroup/${cgroupName}/tasks`, `${this.process.pid}`);
    }


    static startContainer(containerId) {
        const container = this.getContainerDetails(containerId);

        // Use Runc to run the container
        runc.run(container);

        // Container-shim manages the lifecycle of the container
        const shim = new ContainerShim(container);
        shim.start();

    }

    static  getContainerDetails(containerId) {
        
    }
}
