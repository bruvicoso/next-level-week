import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    // Pesquisar sobre biblioteca para manipular os estados
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');



    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    // Send form
    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input id='name' title='Nome completo' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Input id='avatar' title='Avatar' value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input id='whatsapp' title='Whatsapp' value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <Textarea id='bio' title='Biografia' value={bio} onChange={(e) => { setBio(e.target.value) }}></Textarea>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            id='subject'
                            title='Matéria'
                            value={subject} 
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Matemática', label: 'Matemática' },
                            ]}
                        />
                        <Input id='cost' title='Custo da sua hora por aula' value={cost} onChange={(e) => { setCost(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        id='week_day'
                                        title='Dia da semana'
                                        onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        value={scheduleItem.week_day}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                        ]}
                                    />
                                    <Input 
                                        id='from' 
                                        title='Das' 
                                        onChange={ e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={scheduleItem.from} 
                                        type='time' />
                                    
                                    <Input 
                                        id='to' 
                                        title='Até' 
                                        onChange={ e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to} 
                                        type='time' />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante ! <br />
                            Preencha todos os dados
                        </p>

                        <button type='submit'>Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;