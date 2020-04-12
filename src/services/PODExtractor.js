import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import { v4 as uuidv4 } from 'uuid';
const fc = new FC(auth);

export const retrieveJson = async (jsonUrl) => {
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl)
    }
}

export const retrieveAllRoutes = async (personWebId) => {
    var routeURI = personWebId
    var routeURIExtended = routeURI.substring(0, routeURI.length - 16) + '/viade/routes'
    var res = []
    if(await fc.itemExists(routeURIExtended)) {
        res = await fc.readFolder(routeURIExtended);
        return res
    } else {
        await fc.createFolder(routeURIExtended)
        return res
    }
}

export const storeJSONToPOD = async (jsonLD, callback) => {
    let session = await auth.currentSession();
    let userWebIdRoute = session.webId.substring(0, session.webId.length - 16) + '/viade/routes';
    let formattedName = jsonLD.name.replace(/ /g, "_");
    console.log(formattedName + " "+jsonLD.name)
    let fileName = formattedName + '_' + uuidv4() + '.jsonld';
    let fileURI = userWebIdRoute + '/' + fileName;
    if(await fc.itemExists(userWebIdRoute)) {
        fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then( fileCreated => {
            callback(true);
        }, err => { callback(false); });
    } else {
        await fc.createFolder(userWebIdRoute);
        fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then( fileCreated => {
            callback(true);
        }, err => { callback(false); });
    }
}