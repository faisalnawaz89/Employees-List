
import { Content, Grid, Wrapper } from './Header.styles'

const Header = () => {


    return (
    <>
        
        <Wrapper>
            <Content>
                 <Grid>
                    <div className="headerCell">Employee Sheet</div>
                    {<button className="logout" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/login')}}>Logout</button>}
                </Grid>
            </Content>
        </Wrapper>
        
    </>
  )
}

export default Header