class CreateNotification{
    newBid(offer, itemTitle){
        let message = `You just received a new offer of <b>${offer}</b> on your Item <b>${itemTitle}</b>.`;

        return message;
    }

    static send(type, data){
        let message              = "";
        const createNotification = new CreateNotification();

        switch (type) {
            case "new-bid":
                message = createNotification.newBid(data.offer, data.title);
                data    = {message, user_id: data.owner};
                break;

            default:
                break;
        }

        (new FetchRequest("POST", "api/notifications", data)).send();
    }
}