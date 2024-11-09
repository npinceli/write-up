var followModule = {
    follow: function(button){
        const suggestionItem = button.closest('.suggestions-items');
        const userId = suggestionItem.querySelector('input').value;
        const btnFollow = suggestionItem.querySelector('#btn_follow');
        const btnUnfollow = suggestionItem.querySelector('#btn_unfollow');

        fetch('follow_user', {
            method: "POST",
            body: JSON.stringify({'userId': userId}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error");
            }
        }).then(() => {
            btnFollow.classList.add('hidden');
            btnUnfollow.classList.remove('hidden');
        }).catch((error) => {
            console.log(error)
        })
    },

    unfollow: function(button){
        const suggestionItem = button.closest('.suggestions-items');
        const userId = suggestionItem.querySelector('input').value;
        const btnFollow = suggestionItem.querySelector('#btn_follow');
        const btnUnfollow = suggestionItem.querySelector('#btn_unfollow');

        fetch('unfollow_user', {
            method: "POST",
            body: JSON.stringify({'userId': userId}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error");
            }
        }).then(() => {
            btnFollow.classList.remove('hidden');
            btnUnfollow.classList.add('hidden');
        }).catch((error) => {
            console.log(error)
        })
    }
}