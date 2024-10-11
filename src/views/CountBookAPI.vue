<template>
    <div id="app">
        <pre>{{ jsondata }}</pre>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookCount();
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://countbooks-qccmh3q7tq-uc.a.run.app')
                this.jsondata = response.data;
                this.error = null;
            
            } catch (error) {
                console.error('Error fetching book count', error);
                this.error = error;
                this.count = null;
            }
        }
    }
}
</script>