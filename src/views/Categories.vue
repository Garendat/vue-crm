<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <loader v-if="loading" />
            <div v-else class="row">

                <CategoryCreate />

                <CategoryEdit
                    v-if="categories.length"
                    :categories="categories"
                    :key="categories.length + updateCount"
                    @update-category="updateCount++"
                />

                <p v-else class="center">Категорий нет</p>

            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
    name: 'Categories',
    components: { CategoryCreate, CategoryEdit },
    data: () => ({
        loading: true,
        updateCount: 0
    }),
    async mounted () {
        await this.$store.dispatch('fetchCategories')
        this.loading = false
    },
    computed: {
        categories () {
            return this.$store.getters.getCategories
        }
    },
    methods: {
    }

}
</script>

<style scoped>

</style>
