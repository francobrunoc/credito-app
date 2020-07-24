<template>
    <v-container>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="clientes"
                item-key="name"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar>
                    <v-toolbar-title>Clientes</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="reset"
                            >Incluir
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form ref="form" v-model="valid">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.nome" label="Nome"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.cpf" label="CPF"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.idade" label="Idade"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.sexo" label="Sexo"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.estadoCivil" label="Estado Civil"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.estado" label="Estado"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.dependentes" label="Dependentes"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.renda" label="Renda"
                                                              required :rules="nameRules"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save" :disabled="!valid">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="_delete(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary">Sem Registros de Clientes</v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Cliente',

        methods: {
            editItem(item) {
                this.editedIndex = this.clientes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            reset() {
                this.$refs.form.reset()
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.clientes[this.editedIndex], this.editedItem)
                } else {
                    this.clientes.push(this.editedItem)
                    this._submit()
                }
                this.close()
            },
            _list: function () {
                // eslint-disable-next-line no-return-assign
                axios.get(this.BASE_URL_CLIENTE + 'list').then(res =>
                    this.clientes = res.data
                ).catch(err => console.log(err))
            },
            _submit: function () {
                axios.post(this.BASE_URL_CLIENTE + 'save', this.editedItem).then(
                ).catch(err => console.log(err))
            },
            _delete: function (cliente) {
                if (confirm('Você tem certeza que deseja apagar este cliente?')) {
                    axios.delete(this.BASE_URL_CLIENTE + cliente.id).then(() =>
                        this.clientes.splice(this.clientes.indexOf(cliente), 1)
                    ).catch(err => console.log(err))
                }
            }
        },
        data() {
            return {
                nameRules: [
                    v => !!v || 'Name is required'
                ],
                valid: true,
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    companyName: '',
                    fantasyName: ''
                },
                defaultItem: {
                    companyName: '',
                    fantasyName: ''
                },
                singleSelect: false,
                selected: [],
                headers: [
                    {
                        align: 'start',
                        text: 'Nome',
                        value: 'nome'
                    },
                    {
                        text: 'CPF',
                        value: 'cpf'
                    },
                    {
                        text: 'Idade',
                        value: 'idade'
                    },
                    {
                        text: 'Sexo',
                        value: 'sexo'
                    },
                    {
                        text: 'Estado Civil',
                        value: 'estadoCivil'
                    },
                    {
                        text: 'Estado',
                        value: 'estado'
                    },
                    {
                        text: 'Dependentes',
                        value: 'dependentes'
                    },
                    {
                        text: 'Renda',
                        value: 'renda'
                    },
                    {
                        value: 'actions',
                        sortable: false
                    }
                ],
                cliente: {
                    id: null,
                    cpf: null,
                    idade: null,
                    sexo: null,
                    estadoCivil: null,
                    estado: null,
                    dependentes: null,
                    renda: null
                },
                clientes: [],
                BASE_URL_CLIENTE: 'http://localhost:8080/cliente/'
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Novo Cliente' : 'Alterar Cliente'
            }
        },
        mounted() {
            this._list()
        },
        watch: {
            dialog(val) {
                val || this.close()
            }
        }
    }
</script>

<style scoped>

</style>
