import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useState } from 'react';
import styles from './Comment.module.css'

interface CommentProps{
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment } : CommentProps) {
  //Como o like vai mudar de acordo com a ação do usuário ao clicar no botão, vamos armazenar isso em um estado
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    console.log('deletar')

    onDeleteComment(content)
  }

  function handleLikeComment()  {
   setLikeCount((state) =>  {
    return state + 1
   })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false}
       src="https://github.com/FernandoGeancarlo.png" 
       alt="Foto de perfil" 
       />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Fernando Araujo</strong>
              <time title='11 de Maio às 08:13' dateTime="22-05-11 08:13:00">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}