class Command {

    name;

    aliases = [];

    disabled = false;

    exec = ( message, params ) => {
        
    }

    onStart = () => {

    }

    onExec = ( message, params ) => {
        this.exec(message, params);
    }
    

}

export default Command;