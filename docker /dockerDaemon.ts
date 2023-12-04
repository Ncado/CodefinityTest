







import {BashCommands} from "./bash";
import {Container} from "./Container";

function handleError(error: any) {

}

class DockerDaemon {
    private containerFileSystem: any;
    parseInstructions(DockerfilePath) {
        // Extract each instruction and its arguments
        // instructions with  arguments
        return "instructions"
    }


    runInstruction(args, fileSystem) {
        //Start RUN instruction
    }

    copyInstruction(args, fileSystem)  {
        BashCommands.cp(args.src, `${fileSystem}/${args.dest}`);
    }

    envInstruction(args, fileSystem)  {
    }


    executeInstruction(instruction, fileSystem,baseImage) {
        switch (instruction.type) {
            case 'RUN':
                return this.runInstruction(instruction.args, fileSystem);
            case 'COPY':
                return this.copyInstruction(instruction.args, fileSystem);
            case 'ENV':
                return this.envInstruction(instruction.args, fileSystem);

        }


        let newFileSystemSnapshot = this.snapshotFileSystem(this.containerFileSystem);

        let layer = this.calculateDiff(this.containerFileSystem, newFileSystemSnapshot);


        return {
            newFileSystem: newFileSystemSnapshot,
            newLayer: layer
        };
    }

    snapshotFileSystem(fileSystem) {
        BashCommands.cd('/');
        BashCommands.tar('cf', `${fileSystem}.tar`, `${fileSystem}`)
    }

    calculateDiff(oldFileSystem, newFileSystem) {

        let result = BashCommands.diff('-r', oldFileSystem, newFileSystem)

        return result;
    }

    createImage(DockerfilePath) {
        const instructions = this.parseInstructions(DockerfilePath);

        function createEmptyContainer() {

        }

        let baseImage = createEmptyContainer();

        for (const instruction of instructions) {

            let executionResult = this.executeInstruction(instruction["instruction"], instruction["args"], baseImage["fileSystem"]);

            baseImage["baseImage"] = executionResult["newFileSystem"];

            baseImage["layers"].push(executionResult["newLayer"]);
        }

        return baseImage;
    }




    saveLayerOnDisk(layerData, filePath) {

        fs.writeFile(filePath, layerData, err => {
            if (err) {
                console.error('Error saving layer:', err);
            } else {
                console.log('Layer saved successfully:', filePath);
            }
        });
    }



    downloadImage(imageName) {
        const url = `https://registry.hub.docker.com/v2/${imageName}/manifests/latest`;

        function makeHttpGetRequest(url: string) {
    return{
        success: 1
    }

        }

        let imageMetadata = makeHttpGetRequest(url);



        if (imageMetadata.success) {
            let parsedMetadata = parseMetadata(imageMetadata.data);

            for (let i = 0; i < parsedMetadata.layers.length; i++) {
                let layerUrl = parsedMetadata.layers[i].url;

                let layerFile = makeHttpGetRequest(layerUrl);

                if (layerFile.success) {
                    this.saveLayerOnDisk(layerFile.data, `layer${i}.tar`);
                } else {
                    handleError(layerFile.error);
                }
            }
        } else {
            handleError(imageMetadata.error);
        }
    }

    async createContainer(image: any) {
        const container = new Container(image);

        await container.initializeNamespaces();

        await container.initializeCgroups(8);

        return container;
    }


    setupFilesystem(imageName) {
        function createSystemDirectories(rootFs: string) {

        }


        const rootFs = `path/imagename`;

        //create root filesystem
        BashCommands.mkdir(rootFs);


        createSystemDirectories(rootFs)

    }

    setupNetwork(containerId) {

    }


    startContainer(containerId: string) {
        Container.startContainer(containerId)
    }
}









function main() {
    const imageName = "ubuntu:18.04";
    const containerId = "uniqueContainerId";

    const dockerDaemon = new DockerDaemon();


    dockerDaemon.downloadImage(imageName);
    const container = dockerDaemon.createContainer(imageName);
    dockerDaemon.setupFilesystem(imageName);
    dockerDaemon.setupNetwork(containerId);
    dockerDaemon.startContainer(containerId);

}

main();