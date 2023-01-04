import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content{
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content } : PostProps)  {
  const [comments, SetComments] = useState([
    'Post muito bacana, hein?!',
])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
     
    //imutabilidade
    SetComments([...comments, newCommentText]) //spread operator vai copiar a variável do array usando o '...'
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string){
    //Remover um comentário de dentro da lista
    //Vou criar uma nova lista de comentários, sem o comentário que eu não quero mais
    // Com o filter vai percorrer cada comentário e de dentro se for retornado true, irá manter na lista, se retornar false irá remover
    const commentsWithoutDeletedOne = comments.filter(comment =>  {
      return comment !== commentToDelete 
    })

    SetComments(commentsWithoutDeletedOne) 
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}  />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
       
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
        {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment}  className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
        name="comment" 
        className={styles.textarea} 
        placeholder='Deixe seu comentário'  
        value = {newCommentText}
        onChange={handleNewCommentChange}
        onInvalid={handleNewCommentInvalid} //É chamada sempre que o html identificar que tentamos realizar um submit do form, só que o texto era inválido
        required
        />

        <footer>
          <button  type='submit' disabled={isNewCommentEmpty}>
            Publicar
            </button>
        </footer>
      </form>

    
      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        })}
      </div>
    </article>
  )
}