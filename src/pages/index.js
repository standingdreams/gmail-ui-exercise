import React, { useState, useReducer } from "react"
import moment from 'moment';
import { useStaticQuery, graphql } from "gatsby"

import emailData from "../data/emails.json"
import Layout from "../components/layout"

function reducer(state, action) {
  const { activeTag } = state

  switch(action.type) {
    case "tag":
      return {
        ...state,
        activeTag: action.payload
      }

    default:
      throw new Error()
  }
}

const IndexPage = () => {
  const [activeNav, setActiveNav] = useState('inbox')
  const initialState = {
    activeTag: '',
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const data = useStaticQuery(graphql`
    {
      allDataJson {
        edges {
          node {
            messages {
              body
              date
              id
              sender
              subject
              tags
            }
          }
        }
      }
    }
  `)

  return (
    <Layout title="Home">
      <section className="c-inbox">
        <div className="l-container">
          <div className="c-sidebar">
            <nav className="c-sidebar__nav">
              <ul>
                <li>
                  <button className={`c-sidebar__navItem c-sidebar__navItem--inbox${activeNav === 'inbox' ? ' c-sidebar--active' : ''}`} onClick={() => {setActiveNav('inbox')}}>Inbox <span>{ emailData.messages.length }</span></button>
                </li>
                <li>
                  <button className={`c-sidebar__navItem c-sidebar__navItem--starred c-sidebar__navItem--interior${activeNav === 'starred' ? ' c-sidebar--active' : ''}`} onClick={() => {setActiveNav('starred'); dispatch({ type:"tag", payload: "starred" })}}>Starred</button>
                </li>
                <li>
                  <button className={`c-sidebar__navItem c-sidebar__navItem--tags c-sidebar__navItem--interior${activeNav === 'travel' ? ' c-sidebar--active' : ''}`} onClick={() => {setActiveNav('travel'); dispatch({ type:"tag", payload: "travel" })}}><span></span>Travel</button>
                </li>
                <li>
                  <button className={`c-sidebar__navItem c-sidebar__navItem--tags c-sidebar__navItem--interior${activeNav === 'work' ? ' c-sidebar--active' : ''}`} onClick={() => {setActiveNav('work'); dispatch({ type:"tag", payload: "work" })}}><span></span>Work</button>
                </li>
                <li>
                  <button className={`c-sidebar__navItem c-sidebar__navItem--trash c-sidebar__navItem--interior${activeNav === 'trash' ? ' c-sidebar--active' : ''}`} onClick={() => {setActiveNav('trash'); dispatch({ type: "tag", payload: "trash" })}}>Trash</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="emailList">
            <table className="emailList__table">
              <tbody>
                {data.allDataJson.edges[0].node.messages.filter(message => (activeNav !== 'inbox' ? message.tags.includes(state.activeTag) : true)).map((email, index) => (
                  <tr className={`emailList__item`} key={email.id}>
                    <td className="emailList__sender">{ email.sender }</td>
                    <td className="emailList__details">
                      <div className="emailList__subject">
                        { email.subject }
                      </div>
                      <div className="emailList__snippet" dangerouslySetInnerHTML={{__html:email.body}}/>
                      <div className="emailList__tags">
                        {
                          <ul>
                            { email.tags.map((tag, index) => (<li key={ index }>{ tag }</li>)) }
                          </ul>
                        }
                      </div>
                    </td>
                    <td className="emailList__date">{ moment(email.date).format('MM/DD/YYYY') }</td>
                    <td className="emailList__nav">
                      <nav>
                        <ul>
                          <li>
                            <button>Delete</button>
                            <button>Star</button>
                          </li>
                        </ul>
                      </nav>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
