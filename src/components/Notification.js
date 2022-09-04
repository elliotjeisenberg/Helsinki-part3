function Notification({notification}) {
    if (notification.content === null) return null
    
    console.log(notification)
    let style = ''


    if (notification.type === 'success') {
        style = {
            color:'green',
            background:'lightgreen',
            borderStyle:'solid',
            padding:'10px'
        }
    } else {
            style = {
            color:'red',
            background:'pink',
            borderStyle:'solid',
            padding:'10px'
        }
    }

    return ( 
        <div style={style}>
            {notification.content}
        </div> 
    );
}

export default Notification;