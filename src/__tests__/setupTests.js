// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/';
import parseRouteJsonLD from '../services/importing/DomainJSONLDParser.js'
import {TrackPoint, Resource, Comment, RouteSpec} from "../domain/DomainClasses.js"


const comments = [
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.angelixus/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.raupemol/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>")
]


const media = [
    new Resource("http://inrupt.luispc1998/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.angelixus/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.raupemol/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>")
]

const points = [
    new TrackPoint(45.123, 34.121),
    new TrackPoint(46.123, 34.121),
    new TrackPoint(47.123, 34.121),
    new TrackPoint(48.123, 32.121),
    new TrackPoint(49.123, 34.121),
    new TrackPoint(40.123, 32.121),
    new TrackPoint(50.123, 33.121),
    new TrackPoint(53.123, 34.121),
    new TrackPoint(54.123, 34.121),
    new TrackPoint(55.123, 35.121),
    new TrackPoint(55.123, 34.121)
]

const params = {
    name:"Route test 1",
    description:"This is a test to see the output of the JsonLDConversor",
    itinerary:points,
    comments:comments,
    resources:media

}

const route = new RouteSpec(params)



test("Parsing example data", () =>{
    expect(parseRouteJsonLD(route)).toMatchSnapshot()
})