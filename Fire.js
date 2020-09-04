import firebase from "firebase";

class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }
    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
               
                apiKey: "AIzaSyAX-hzBnyXrsOSq9LHAmxxf5GueG3b-Hes",
    authDomain: "ping-797e1.firebaseapp.com",
    databaseURL: "https://ping-797e1.firebaseio.com",
    projectId: "ping-797e1",
    storageBucket: "ping-797e1.appspot.com",
    messagingSenderId: "3186043465",
    appId: "1:3186043465:web:ad8b127e7ab4df0e566d98"
                
            })
        };
    }
        checkAuth= () => {
            firebase.auth().onAuthStateChanged(user =>{
                if (!user){
                    firebase.auth().signInAnonymously();
                }
            });
        };

        send = messages => {
            messages.forEach(item => {
                const message = {
                    text: item.text,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: item.user
                };
    
                this.db.push(message);
            });
        };
        parse = message => {
            const { user, text, timestamp } = message.val();
            const { key: _id } = message;
            const createdAt = new Date(timestamp);
    
            return {
                _id,
                createdAt,
                text,
                user
            };
        };
        get = callback => {
            this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
        };
    
        off() {
            this.db.off();
        }
        get db() {
            return firebase.database().ref("messages");
        }
        get uid() {
            return (firebase.auth().currentUser || {}).uid;
        }
    }

export default new Fire();