<template>
    <v-container>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="clientes"
                item-key="name"
                class="elevation-1"
                dense
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
                                        <v-text-field v-model="editedItem.nome" label="Nome*"
                                                      required :rules="clienteRules"></v-text-field>
                                        <v-text-field v-mask="'###.###.###-##'" v-model="editedItem.cpf" label="CPF*"
                                                      required :rules="clienteRules"></v-text-field>
                                        <v-text-field v-model="editedItem.idade" label="Idade*"
                                                      required :rules="clienteRules"></v-text-field>
                                        <v-radio-group v-model="editedItem.sexo" :mandatory="true" required>
                                            <v-radio label="Masculino" value="M"></v-radio>
                                            <v-radio label="Feminino" value="F"></v-radio>
                                        </v-radio-group>
                                        <v-row>
                                            <v-col>
                                                <v-select :items="selectEstadoCivil" v-model="editedItem.estadoCivil"
                                                          label="Estado Civil*"
                                                          :rules="clienteRules"
                                                          required
                                                ></v-select>
                                            </v-col>
                                            <v-col>
                                                <v-select :items="selectEstados" v-model="editedItem.estado"
                                                          label="Estado*"
                                                          :rules="clienteRules"
                                                          required
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model="editedItem.dependentes" label="Dependentes*"
                                                              required :rules="clienteRules"></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="editedItem.renda" label="Renda*"
                                                              required :rules="clienteRules"></v-text-field>
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
    import {mask} from 'vue-the-mask'

    export default {
        name: 'Cliente',
        directives: {mask},
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
                }
                this._submit()
                this.close()
            },
            _list: function () {
                axios.get(this.BASE_URL_CLIENTE + 'list').then(res => {
                        return this.clientes = res.data;
                    }
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
                clienteRules: [
                    v => !!v || 'Campo Obrigatório'
                ],
                valid: true,
                dialog: false,
                editedIndex: -1,
                editedItem: {
                    id: '',
                    nome: '',
                    cpf: '',
                    idade: '',
                    sexo: '',
                    estadoCivil: '',
                    estado: '',
                    dependentes: '',
                    renda: ''

                },
                defaultItem: {
                    id: '',
                    nome: '',
                    cpf: '',
                    idade: '',
                    sexo: '',
                    estadoCivil: '',
                    estado: '',
                    dependentes: '',
                    renda: ''
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
                    nome: null,
                    cpf: null,
                    idade: null,
                    sexo: null,
                    estadoCivil: null,
                    estado: null,
                    dependentes: null,
                    renda: null
                },
                clientes: [],
                selectEstadoCivil: ['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVA'],
                selectEstados: [
                    'AC',
                    'AL',
                    'AP',
                    'AM',
                    'BA',
                    'CE',
                    'DF',
                    'ES',
                    'GO',
                    'MA',
                    'MS',
                    'MT',
                    'MG',
                    'PA',
                    'PB',
                    'PR',
                    'PE',
                    'PI',
                    'RJ',
                    'RN',
                    'RS',
                    'RO',
                    'RR',
                    'SC',
                    'SP',
                    'SE',
                    'TO'
                ],
                BASE_URL_CLIENTE: 'http://localhost:8081/cliente/'
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
