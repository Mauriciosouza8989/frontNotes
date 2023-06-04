import {Container, Links} from './styles.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Header} from '../../components/header'
import { Section } from '../../components/section/index.jsx'
import {Button} from '../../components/button'
import {Tag} from '../../components/tag'
import { ButtonText } from '../../components/buttonText/index.jsx'
import { Content } from './styles.js'

import { useParams } from 'react-router-dom'

import { api } from '../../services/api'


export function Details(){
  const [data, setData] = useState([])
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() =>{
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

  function handleBack(){
    navigate(-1)
  }

  async function handleDeleteNote(){
    const deleteConfirm = confirm("Você tem certeza que deseja excluir esta nota?")
    if(!deleteConfirm) return
    await api.delete(`/notes/${params.id}`)
    navigate(-1)
  }
  return(
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleDeleteNote}/>

            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {
              data.links && 
              <Section title="Links uteis">
                  <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target='_blank'>
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                  </Links>


              </Section>
              }
        
              {
                data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map((tag)=>(
                      <Tag title={tag.name} key={tag.id}/>

                    ))
                  }
                </Section>
              }

              <Button title="Voltar" onClick={handleBack} />
            </Content>
        </main>
      }
    </Container>
  )
}