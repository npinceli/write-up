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

var postModule = {
    openModal: function() {
        const modal = document.getElementById("modal_post");
        const overlay = document.getElementById("overlay_post");

        modal.style.display = "flex";
        overlay.style.display = "block";
    },

    closeModal: function() {
        const modal = document.getElementById("modal_post");
        const overlay = document.getElementById("overlay_post");

        modal.style.display = "none";
        overlay.style.display = "none";
    },
    
    post: function() {
        var text = document.getElementById("post_text").value;

        this.setLoading(true);

        setTimeout(() => {
            fetch('create_post', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'postText': text
                }),
            }).then(response => {
                if(!response.ok){
                    return response.json().then(data => {
                        const errorMessage = data.message;
                        throw new Error(errorMessage)
                    })
                }
                return response.json();
            }).then(data => {
                const containerPost = document.querySelector('.container-posts');
                const newPost = `
                    <div class="post">
                        <div class="post-user">
                            <img src="${data.avatar}" width="50px" height="50px">
                            <div class="post-user-info">
                                <div>
                                    <b>${data.name}</b>
                                    <span class="opacity-50 font-14">${data.username}</span>
                                </div>
                                <span class="post-user-date opacity-50 font-14">${data.createdAt}</span>
                            </div>
                        </div>
                        <p class="post-text">${text}</p>
                        <div class="post-data">
                            <div class="post-data-likes">
                                <span class="btn-like-post" onclick="postModule.likePost(${data.id_post})">
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                                <span id="numLikes_${data.id_post}">0</span>
                            </div>
                            <div class="post-data-comments">
                                <span class="btn-comment-post">
                                    <i class="fa-regular fa-comment"></i>
                                </span>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                `
                containerPost.insertAdjacentHTML("afterbegin", newPost);
                document.getElementById("post_text").value = '';
                this.closeModal();
            }).catch(error => {
                console.log(error)
                this.setLoading(false)
            }).finally(() => {
                this.setLoading(false)
            })
            }, 700);
    },

    setLoading: function(loading) {
        const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`
        const btnModalPost = document.getElementById('btn_modal_post');

        if (loading){
            btnModalPost.disabled = true;
            btnModalPost.innerHTML = loadingSvg;
            btnModalPost.querySelector('.lucide-loader-circle').style.animation = 'rotate 2s linear infinite';
            btnModalPost.classList.add('icon-center');
        } else {
            btnModalPost.disabled = false;
            btnModalPost.textContent = 'Postar';
            btnModalPost.classList.remove('icon-center');
        }
    },

    likePost: function(postId){
        var numLikes = document.getElementById(`numLikes_${postId}`)

        fetch('like_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'postId': postId
            }),
        }).then(response => {
            if(!response.ok){
                return response.json().then(data => {
                    const errorMessage = data.message;
                    throw new Error(errorMessage)
                })
            }
            return response.json();
        }).then(data => {
            var currentLikes = parseInt(numLikes.textContent);

            currentLikes += 1;

            numLikes.textContent = currentLikes;
        })
    }
}