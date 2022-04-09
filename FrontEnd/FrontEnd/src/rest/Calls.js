
const API_BASE = 'http://localhost:5000/';

const basicFecth = async (endpoint) => {
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}

export default {
    getHomeList: async () => {
        return [
            {
                title: "Lista de atendimentos",
                items: await basicFecth(`listatendimentos`)
            }]
    }, getEmpregadosList: async () => {
        return [
            {
                title: "listempregados",
                items: await basicFecth(`listempregados`)
            }]
    }, getLugaresList: async () => {
        return [
            {
                title: "Lista de lugares",
                items: await basicFecth(`listlugares`)
            }]
    }, getIdFromEmpregados: async () => {
        return [
            {
                title: "Get id empregados",
                items: await basicFecth(`idfromempregados`)
            }]
    }
}