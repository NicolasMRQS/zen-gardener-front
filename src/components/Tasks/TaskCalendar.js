/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

import PropTypes from 'prop-types';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Moment is used react-big-calendar for date formatting and stuff
import moment from 'moment';
// DO NOT REMOVE moment locale, it is used by react-big-calendar
// to format dates according to user localization
// and sets 'monday' first of week
import 'moment/locale/fr';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Trash, ArrowUpCircle } from 'react-feather';
import { useDispatch } from 'react-redux';

import { actionDeleteTask, actionUpdateTask } from '../../redux/tasks/tasksActions';
import Modal from '../Modal';
import { dateInputFormat } from '../../utils/dateUtils';

import './styles.scss';

function TaskCalendar({ taskEvents }) {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({});

  const localizer = momentLocalizer(moment);

  const clickRef = useRef(null);

  const {
    register, handleSubmit, reset, watch, formState: { errors },
  } = useForm();

  useEffect(() => () => {
    window.clearTimeout(clickRef?.current);
  }, []);

  // Set input as taskData passed
  useEffect(() => {
    reset({
      id: taskData.id,
      label: taskData.title,
      begin_date: dateInputFormat(taskData.start),
      limit_date: dateInputFormat(taskData.end),
    });
  }, [taskData]);

  // Watch begin_date for validation
  const beginDate = watch('begin_date', taskData.start);

  const onSelectEvent = useCallback((calEvent) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      setTaskData(calEvent);
      setModalIsOpen(true);
    }, 250);
  }, []);

  const messages = {
    date: 'Date',
    time: 'Heure',
    event: 'Évènement',
    allDay: '',
    week: 'Semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Précédent',
    next: 'Suivant',
    yesterday: 'Hier',
    tomorrow: 'Demain',
    today: 'Aujourd\'hui',
    agenda: 'Planning',

    noEventsInRange: 'Pas d\'évènement dans ces dates',

    showMore: (total) => `+${total} autre(s)`,
  };

  // function handleclick update
  const handleClickUpdate = (dataForm) => {
    dispatch(actionUpdateTask(dataForm));
    setModalIsOpen(false);
  };

  // function handleclick delete
  const handleClickDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      dispatch(actionDeleteTask(taskData.id));
      setModalIsOpen(false);
    }
  };

  return (
    <section className="TaskCalendar">
      <Calendar
        events={taskEvents}
        startAccessor="start"
        endAccessor="end"
        views={[Views.AGENDA, Views.MONTH]}
        localizer={localizer}
        defaultView={Views.AGENDA}
        defaultDate={moment().toDate()}
        messages={messages}
        hideTimeIndicator
        popup
        onSelectEvent={onSelectEvent}
      />

      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <h2>Modifier ou supprimer une tâche</h2>
        <form className="editCalendar" onSubmit={handleSubmit(handleClickUpdate)}>
          <input
            className="editInputName"
            id="label"
            type="text"
            {...register('label')}
          />
          <label htmlFor="begin_date"><p>Date de début :</p>
            <input
              id="begin_date"
              type="date"
              {...register('begin_date', { valueAsDate: true })}
            />
          </label>
          <label htmlFor="limit_date"><p>Date de fin :</p>
            <input
              id="limit_date"
              type="date"
              {...register('limit_date', { valueAsDate: true, validate: (limitDate) => dateInputFormat(limitDate) >= dateInputFormat(beginDate) })}
            />
            {errors.limit_date?.type === 'validate' && <p className="Register__error">⚠ La date de fin ne doit pas être inférieur à la date du début</p>}
          </label>
          <br />
          <button className="submitUpdateTask" type="submit"><ArrowUpCircle /> Update</button>
          <button className="submitDeleteTask" type="button" onClick={handleClickDelete}><Trash /> Delete</button>
        </form>
      </Modal>
    </section>
  );
}

TaskCalendar.propTypes = {
  taskEvents: PropTypes.array.isRequired,
};

export default TaskCalendar;
