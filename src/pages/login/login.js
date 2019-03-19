import React, { Component } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Grid } from '@material-ui/core'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

class Login extends Component {
  state = {
    isUserLoggedIn: false,
    user: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Dados usuario::', user)
      this.setState({
        isUserLoggedIn: !!user,
        user: null
      })
    })
  }

  login = () => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.setState({
        isUserLoggedIn: false,
        user: null
      })
    })
  }

  render () {
    const { isUserLoggedIn, user } = this.state

    return (
      <Container>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={6}>
            <Logo>Logo</Logo>
          </Grid>
          <Grid item xs={12} container justify='center'>
            {
              isUserLoggedIn && (
                <div>
                  <pre>{user.displayName}</pre>
                  <Button variant='contained' onClick={this.logout}>Sair</Button>
                </div>
              )
            }
            {
              !isUserLoggedIn && <GitHubButton onClick={this.login}>Entrar com Github</GitHubButton>
            }

          </Grid>
        </Grid>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 20px
`

const Logo = styled.h1`
  width: 100%;
  text-align: center;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  &&{
    font-size: 20px;
    max-width: 480px;
    padding: 10px;
    text-transform: none;
  }
`

export default Login
