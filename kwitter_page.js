//YOUR FIREBASE LINKS
var firebaseConfig = {
    apikey: "AIzaSyBRulxwpRj9Wyh38Z05VD202H8tyJcXnsI",
    authdomain: "kwitter-6e34b.firebaseapp.com",
    projectId: "kwitter-6e34b",
    databaseURL: "https://kwitter-6e34b-default-rtdb.firebaseio.com",
    storageBucket: "kwitter-6e34b.appspot.com",
    messagingSenderId: "64732949389",
    appId: "1:64732949389:web:a6753a19c93bb590d9abc4"
};

firebase.initializeApp(firebaseConfig)
user_name = localStorage.getItem('user_name');
room_name = localStorage.getItem('room_name');
function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0 
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class = 'user_tick' src = 'https://www.freeiconspng.com/thumbs/checkmark-png/black-checkmark-png-4.png'</h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like :  " + like + "  </span></button><hr>"
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End Code
            }
        });
    });
}

getData();
function logout() {
    localStorage.removeItem("user_name");
    localStroage.removeItem("room_name");
    window.location = "index.html";
}

function updateLike(message_id) {
        likes = document.getElementById(message_id).value;
        likes = Number(likes) + 1;
        firebase.database().ref(room_name).child(message_id).update({
            like: likes
        })
    }