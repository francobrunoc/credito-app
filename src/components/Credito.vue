<template>
    <div>
        <v-card class="mx-auto" max-width="350">
            <v-list-item>
                <v-list-item-content>
                    <div align="center">
                        <v-form v-model="valid" @submit.prevent="">
                            <v-text-field v-model="cliente.cpf" v-mask="'###.###.###-##'" label="CPF" required
                                          :rules="creditoRules"></v-text-field>
                        </v-form>
                    </div>
                </v-list-item-content>
            </v-list-item>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="blue darken-1"
                        class="mb-2"
                        text
                        v-bind="attrs"
                        v-on="on"
                        :disabled="!valid"
                        @click="_submit"
                >Consultar
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ 'Proposta de Crédito' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-list-item>
                            <v-col>
                                <v-row>
                                    <v-list-item-content>
                                        <div align="center">
                                            <v-badge v-if="credito.aprovado" color="green" title="APROVADO" />
                                            <v-badge v-else color="red" title="NEGADO"/>
                                            <v-badge v-if="credito.aprovado == null" color="yellow" title="NÃO ENCONTRADO" />
                                        </div>
                                    </v-list-item-content>
                                </v-row>
                                <v-row>
                                    <v-list-item-content>
                                        <v-text-field v-model="credito.cliente.nome" label="Nome" disabled/>
                                    </v-list-item-content>
                                </v-row>
                                <v-row>
                                    <v-list-item-content>
                                        <v-text-field v-model="credito.limiteMaximo" label="Limite Máximo" disabled/>
                                    </v-list-item-content>
                                </v-row>
                                <v-row>
                                    <v-list-item-content>
                                        <v-text-field v-model="credito.limiteMinimo" label="Limite Minimo" disabled/>
                                    </v-list-item-content>
                                </v-row>
                                <v-row>
                                    <v-list-item-content>
                                        <v-text-field v-model="credito.motivo" label="Motivo" disabled/>
                                    </v-list-item-content>
                                </v-row>
                            </v-col>
                        </v-list-item>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import {mask} from 'vue-the-mask'

    export default {
        name: "Credito",
        directives: {mask},
        data() {
            return {
                dialog: false,
                valid: true,
                creditoRules: [
                    v => !!v || 'Campo Obrigatório'
                ],
                cliente: {
                    cpf: null
                },
                credito: {
                    cliente: {
                        nome: null,
                    },
                    aprovado: null,
                    limiteMinimo: null,
                    limiteMaximo: null,
                    motivo: null
                },
                defaultItem: {
                  cliente: {
                      nome: null,
                  },
                    aprovado: null,
                    limiteMinimo: null,
                    limiteMaximo: null,
                    motivo: null
                },
                BASE_URL_CREDITO: 'http://localhost:8081/credito/'
            }
        },
        methods: {
            _submit: function () {
                this.credito = Object.assign({}, this.defaultItem)
                axios.post(this.BASE_URL_CREDITO + 'consult', this.cliente).then(res =>
                    this.credito = Object.assign({}, res.data)
                ).catch(err => console.log(err))
                this.dialog = true
            }
        }
    }
</script>

<style scoped>

</style>
