<template>
        <div>
            <h1>{{ titulo }}</h1>
            <div class="filter-container">
                <label for="filter">Filtro:</label>
                <input id="filter" type="text" v-model="filtro"/>
            </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>City</th>
                    <th></th>
                </tr>
                <tr>
                    <th>
                        <button @click="guardaNuevo()">Agregar</button>
                    </th>
                    <th><input type="text" v-model="contactoNuevoObj.name"></th>
                    <th><input type="text" v-model="contactoNuevoObj.email"></th>
                    <th><input type="text" v-model="contactoNuevoObj.address"></th>
                    <th><input type="text" v-model="contactoNuevoObj.phone"></th>
                    <th><input type="text" v-model="contactoNuevoObj.country"></th>
                    <th><input type="text" v-model="contactoNuevoObj.city"></th>
                    <th></th>
                </tr>
                <tr v-if="indexParaEditar !== null">
                    <th>
                        <button @click="guardaEdicion()">Guardar</button>
                    </th>
                    <th><input type="text" v-model="contactoEditarObj.name"></th>
                    <th><input type="text" v-model="contactoEditarObj.email"></th>
                    <th><input type="text" v-model="contactoEditarObj.address"></th>
                    <th><input type="text" v-model="contactoEditarObj.phone"></th>
                    <th><input type="text" v-model="contactoEditarObj.country"></th>
                    <th><input type="text" v-model="contactoEditarObj.city"></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contacto, index) in contactosFiltrados" :key="contacto.id">
                    <td>{{ contacto.id }}</td>
                    <td>{{ contacto.name }}</td>
                    <td>{{ contacto.email }}</td>
                    <td>{{ contacto.address }}</td>
                    <td>{{ contacto.phone }}</td>
                    <td>{{ contacto.country }}</td>
                    <td>{{ contacto.city }}</td>
                    <td>
                        <button @click="eliminarcontacto(index)">Eliminar {{ index }}</button>
                        <button @click="Editarcontacto(contacto, index)">Editar {{ index }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'MiComponente',
    data() {
        return {
            titulo: 'Agenda de contactos',
            filtro: '',
            contactoNuevoObj: {
                id: "",
                name: "",
                email: "",
                address: "",
                phone: "",
                country: "",
                city: ""
            },
            contactoEditarObj: {
                id: "",
                name: "",
                email: "",
                address: "",
                phone: "",
                country: "",
                city: ""
            },
            indexParaEditar: null,
            contactos: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    created() {
        this.cargarContactos();
    },
    methods: {
        cargarContactos() {
            fetch('contactos.json')
                .then(response => response.json())
                .then(data => {
                    this.contactos = data;
                })
                .catch(error => {
                    console.error('Error al cargar los contactos:', error);
                });
        },
        guardaNuevo() {
            this.contactos.push(Object.assign({}, this.contactoNuevoObj));
            this.resetNuevoObj();
        },
        eliminarcontacto(index) {
            this.contactos.splice(index, 1);
        },
        guardaEdicion() {
            const index = this.contactos.findIndex(c => c.id === this.contactoEditarObj.id);
            if (index !== -1) {
                this.contactos.splice(index, 1, { ...this.contactoEditarObj });
            }
            this.indexParaEditar = null;
        },
        Editarcontacto(contacto, index) {
            this.indexParaEditar = index;
            this.contactoEditarObj = Object.assign({}, contacto);
        },
        resetNuevoObj() {
            this.contactoNuevoObj = {
                id: "",
                name: "",
                email: "",
                address: "",
                phone: "",
                country: "",
                city: ""
            };
        }
    },
    computed: {
        contactosFiltrados() {
            const filtroLower = this.filtro.toLowerCase();
            return this.contactos.filter(contacto => {
                const nameLower = contacto.name ? contacto.name.toLowerCase() : '';
                const emailLower = contacto.email ? contacto.email.toLowerCase() : '';
                return nameLower.includes(filtroLower) || emailLower.includes(filtroLower);
            });
        }
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style scope>
h1 {
    color: #42b983;
    text-align: left;
}

.filter-container {
    text-align: left;
    margin-bottom: 1.5em;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #f0f0f0;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-phone: #f2f2f2;
    text-align: left;
}
</style>