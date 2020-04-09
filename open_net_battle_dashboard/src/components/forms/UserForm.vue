<template>
    <div>
        User form. {{user.isAdmin? "Admin" : "Normal user"}} {{ user.username }} {{ user.email }} {{ user.twitter }}
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        }
    }
}
</script>