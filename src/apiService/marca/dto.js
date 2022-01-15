
const single = (resource) => ({
    id_marca: resource._id,
    nombre: resource.username,
    eliminado: resource.email,
    f_create: resource.f_create,
    f_update: resource.f_update,
    u_create: resource.u_create,
    u_update: resource.u_update
});

const multiple = (resources) => resources.map((resource) => single(resource));

module.exports = {
    single,
    multiple,
};