document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os posts na página
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const postId = post.getAttribute('data-id');
        const likeBtn = post.querySelector('.like-btn');
        const likeText = post.querySelector('.like-text');
        const likeCountSpan = post.querySelector('.like-count');

        // Busca dados salvos no localStorage (ou define valores padrão)
        let likesCount = parseInt(localStorage.getItem(`likes_${postId}`)) || 0;
        let isLiked = localStorage.getItem(`user_liked_${postId}`) === 'true';

        // Função para atualizar a interface do botão
        function updateUI() {
            likeCountSpan.textContent = likesCount;
            
            if (isLiked) {
                likeBtn.classList.add('liked');
                likeText.textContent = 'Curtido';
            } else {
                likeBtn.classList.remove('liked');
                likeText.textContent = 'Curtir';
            }
        }

        // Inicializa o botão com o estado correto ao carregar a página
        updateUI();

        // Evento de clique
        likeBtn.addEventListener('click', () => {
            if (isLiked) {
                likesCount--;
                isLiked = false;
            } else {
                likesCount++;
                isLiked = true;
            }

            // Salva os novos valores no localStorage
            localStorage.setItem(`likes_${postId}`, likesCount);
            localStorage.setItem(`user_liked_${postId}`, isLiked);

            // Atualiza a tela
            updateUI();
        });
    });
});
