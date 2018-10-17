// (function() {
Vue.component("image-modal", {
    data: function() {
        return {
            heading: "I <3 Funky Chicken",
            imgdata: {}
        };
    },
    props: ["imgid"],
    template: "#image-modal",
    mounted: function() {
        // console.log("component has mounted");
        var self = this;
        axios
            .post("/imagemodal", { imgid: self.imgid })
            .then(function(response) {
                self.imgdata = response.data.rows[0];
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    methods: {
        click: function() {
            this.$emit("change", "I <3 EVERBODY");
        }
    }
});

new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: "",
        imgid: ""
    },

    created: function() {
        // console.log("created");
    },
    mounted: function() {
        // console.log("mounted");
        var self = this;
        axios
            .get("/imageboard")
            .then(function(response) {
                self.images = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    updated: function() {
        // console.log("updated");
    },
    methods: {
        upload: function(e) {
            console.log("upload started");
            var formData = new FormData();
            formData.append("file", this.file);
            formData.append("description", this.description);
            formData.append("title", this.title);
            formData.append("username", this.username);
            var me = this;
            axios
                .post("/upload", formData)
                .then(function(response) {
                    me.images.unshift(response.data);
                })
                .catch(function() {
                    if (err) {
                        console.log("err: ", err);
                    } else {
                        console.log("else!");
                    }
                });
        },
        handleFileChange: function(e) {
            this.file = e.target.files[0];
        },
        getData: function(img) {
            this.imgid = img;
        }
    }
});
// })();
