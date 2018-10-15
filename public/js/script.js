new Vue({
    el: "#main",
    data: {
        greetee: ""
    },
    mounted: function() {
        axios.get("/cities").then(function(response) {
            self.cities = response.data;
        });
    },
    methods: {
        emphasize: function(e) {
            e.target.style.textDecoration = "underline";
            this.count = this.count ? this.count + 1 : 1;
        },
        deemphasize: function(e) {
            e.target.style.textDecoration = "";
            this.logCount();
        },
        logCount: function() {
            console.log(this.count);
        }
    }
});
