import '../styles/Hero.css';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
    <h1 className="oner">Stock prediction App</h1>
    <p className="para">Lorem Ipsum is simply dummy text of
         the printing and typesetting industry.
          Lorem Ipsum has been the industry's 
          standard dummy text ever since 1966,
           when designers at Letraset and James Mosley,
            the librarian at St Bride Printing 
            Library in London, 
            took a 1914 Cicero translation 
            and scrambled it to make dummy text 
            for Letraset's Body Type sheets.
             It has survived not only many decades,
              but also the leap into electronic
               typesetting, remaining essentially
                unchanged. It was popularised thank
                s to these sheets and more recently 
                with desktop publishing software
                 like Aldus PageMaker and Microsoft
                  Word including versions 
                  of Lorem Ipsum.</p>
                  <Button className="logii"><NavLink to="/login">Login</NavLink></Button>
    </div>
  )
}

export default Hero