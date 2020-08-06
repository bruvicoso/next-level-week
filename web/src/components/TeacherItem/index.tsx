import React from 'react';

import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/69221012?s=460&u=9671f78551c900343a87b45abdb8bc7bf58297d0&v=4" alt="Bruno Viçoso"/>
                <div>
                    <strong>Bruno Viçoso</strong>
                    <span>Developer</span>
                </div>
            </header>

            <p>
                Desenvolvedor de software 
                <br /><br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore sit numquam tempora beatae vitae non veniam odio expedita perferendis dolor ex rerum quibusdam cupiditate accusantium, possimus explicabo? Sint, deserunt mollitia?
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;