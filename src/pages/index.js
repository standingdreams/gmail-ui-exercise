import React from "react"
import emailData from "../data/emails.json"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout title="Home">
    <table>
      {emailData.messages.map((email, index) => (
        <tr key={email.id}>
          <td>{ email.sender }</td>
          <td>{
            <ul>
              { email.tags.map((tag, index) => (<li key={ index }>{ tag }</li>)) }
            </ul>
           }</td>
          <td>{ email.subject }</td>
          <td dangerouslySetInnerHTML={{__html:email.body}}></td>
          <td>{ email.date }</td>
        </tr>
      ))}
    </table>
  </Layout>
)

export default IndexPage
