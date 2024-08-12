document.addEventListener('DOMContentLoaded',()=>{
    Host_Button = document.getElementById("Host-Button");
    Enter_Button = document.getElementById("Enter-Button");
    Qr = document.getElementById("QR-image");

    document.getElementById('Online').addEventListener('click',()=>{
        scan = document.getElementById("QR-Scan");
        scan.style.display="block";
        scan.style.opacity=1;
    });

    Host_Button.addEventListener('click',()=>{
        Enter_Button.style.display = 'None';
        Qr.style.display = 'block';
        Host_Button.style.display = 'None';
        const sessionID = Math.floor(Math.random() * 1000);
        document.getElementById("Session").innerText = "Room Code: "+sessionID;
        document.getElementById("Continue-Button").style.display = 'block';
        const qrImageUrl = `../PHP/Qr.php?sessionID=${sessionID}`;
        const redirectUrl = `../HTML/game.html?currentPlayer=O&SessionID=${sessionID}`;

        Request('start-Session',sessionID); 

        document.getElementById("QR-image").src=qrImageUrl
        document.getElementById('Continue-Button').onclick = () => {
        window.location.href = redirectUrl;
        };
    }); 
    
    Enter_Button.addEventListener('click',()=>{
        Enter_Button.style.display = 'None';
        Host_Button.style.display = 'None';
        document.getElementById("sessionID").style.display='block';
        document.getElementById("Continue-Button").style.display = 'block';
        
        document.getElementById('Continue-Button').onclick = async() => {
            sessionID = document.getElementById("sessionID").value;
            if(await Exist(sessionID))
            {
                const redirectUrl = `../HTML/game.html?currentPlayer=X&SessionID=`+sessionID;
                window.location.href = redirectUrl;
            }
            else
            {
                
            }
        };
    })
});

async function Exist(sessionID)
{
    response = await Request('check_session',sessionID);
    if (response.data === 'no-session')
    {
        document.getElementById("Session").style.left="15%";
        document.getElementById("Session").style.color ="red";
        document.getElementById("Session").innerText = "Invalid Room Code: "+sessionID;
        return false;
    }
    return true;
}

function Request(action, sessionID, callback) {              //AJAX request function 
    return new Promise((resolve, reject) => {
        console.log("Request");
        $.ajax({
            url: "../Php/main.php",
            method: 'POST',
            data: { action: action,sessionID: sessionID},
            dataType: 'json',
            success: function (response) {
                resolve(response);
                if (callback) { callback(response); }
                console.log(response.message);
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                reject(error);
            }
        });
    });
}

