import 'dotenv/config'

export function getConfig(): any {
        const configParams  = process.env;
        console.log( 'Configuration parameters', {...defaultValues});
        return defaultValues;
    }

    const defaultValues = {
        "type":"postgres",
        "host":"localhost",
        "port":5432,
        "username":"postgres",
        "password":"8711",
        "database":"postgres",
        "entities":[],
        "synchronize":true,
        "autoLoadEntities" : true
    }