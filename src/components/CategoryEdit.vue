<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="updateCategory">
                <div class="input-field" >
                    <select ref="select" v-model="changeId">
                        <option
                            v-for="cat in categories"
                            :key="cat.id"
                            :value="cat.id"
                        >{{ cat.title }}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="changeCategory.title"
                        :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
                    >
                    <label for="name">Название</label>
                    <span
                        v-if="$v.title.$dirty && !$v.title.required"
                        class="helper-text invalid"
                    >Введите название
                    </span>
                </div>
                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model="changeCategory.limit"
                        :class="{invalid: ($v.title.$dirty && !$v.title.minValue)}"
                    >
                    <label for="limit">Лимит</label>
                    <span
                        v-if="$v.limit.$dirty && !$v.limit.minValue"
                        class="helper-text invalid"
                    >Минимальная величина
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize'

export default {
    name: 'CategoryEdit',
    props: ['categories'],
    data: () => ({
        select: null,
        changeId: null,
        changeCategory: {
            id: null,
            title: '',
            limit: null
        }
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(1) }
    },
    mounted () {
        this.select = M.FormSelect.init(this.$refs.select, this.categories)
    },
    watch: {
        changeId (to, from) {
            this.changeCategory = this.categories.find(item => item.id === to)
            M.updateTextFields()
        }
    },
    methods: {
        editCategory (elem) {
            this.changeCategory = elem
        },
        updateCategory () {
            if (this.$v.invalid) {
                this.$v.touch()
                return
            }

            try {
                this.$store.dispatch('updateCategory', this.changeCategory)
                this.$message('Категория успешно обновлена')
                this.$emit('update-category')
            } catch (e) {

            }
        }
    },
    destroyed () {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
}
</script>

<style scoped>

</style>
