﻿new Vue({
	el: "#app",
	data: {
		valid: !1,
		userName: "",
		nameRules: [(a) => !!a.trim() || "Email or username is required"],
		password: "",
		passwordRules: [(a) => !!a.trim() || "Password is required"],
		rememberMe: !1,
		errMsg: "",
	},
	computed: {
		tok: function () {
			return document.querySelector('input[name="__RequestVerificationToken"][type="hidden"]').value;
		},
		payload: function () {
			return { userName: this.userName, password: this.password, rememberMe: this.rememberMe };
		},
	},
	methods: {
		login() {
			axios
				.post("/api/auth/login", this.payload, { headers: { "XSRF-TOKEN": this.tok } })
				.then(() => {
					window.location.replace(this.getQueryParam("ReturnUrl") || "/admin");
				})
				.catch(() => {
					this.errMsg = "Login failed, please try again!";
				});
		},
		getQueryParam(a) {
			let b = window.location.href;
			a = a.replace(/[\[\]]/g, "\\$&");
			let c = new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)"),
				d = c.exec(b);
			return d ? (d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "") : null;
		},
	},
});
