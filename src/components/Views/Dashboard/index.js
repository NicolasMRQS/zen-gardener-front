import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { PlusCircle } from 'react-feather';
import { actionFetchTasks, actionCreateTask } from '../../../redux/tasks/tasksActions';
import TaskCalendar from '../../Tasks/TaskCalendar';
import SheetMapper from '../../Sheets/SheetMapper';
import TaskMapper from '../../Tasks/TaskMapper';
import FavoriteSheetsByMonth from '../../Sheets/FavoriteSheetsByMonth';
import FavoriteSheetsByCategory from '../../Sheets/FavoriteSheetsByCategory';
import { toDateInputFormat } from '../../../utils/dateUtils';

import './styles.scss';
import Modal from '../../Modal';

const SheetDisplayModes = {
  CATEGORY: 'CATEGORY',
  MONTH: 'MONTH',
};

function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);
  const { sheets, favoriteIds } = useSelector((state) => state.sheets);

  const [sheetDisplayMode, setSheetDisplayMode] = useState(SheetDisplayModes.MONTH);
  const [createTaskModalIsVisible, setCreateTaskModalIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitNewTask = ({ taskTitle, taskBegin, taskEnd }) => {
    const task = {
      label: taskTitle,
      begin_date: new Date(taskBegin).toISOString(),
      limit_date: new Date(taskEnd).toISOString(),
    };
    dispatch(actionCreateTask(task));
    setCreateTaskModalIsVisible(false);
    reset();
  };

  const favoriteSheets = SheetMapper.idsToSheets(favoriteIds, sheets);

  useEffect(() => {
    dispatch(actionFetchTasks());
  }, []);

  return (
    <div className="Dashboard">

      <h1 className="Dashboard__hello">Bonjour {user.pseudo} !</h1>
      <div className="Dashboard__content">

        <section className="Dashboard__item tasks">
          <header className="tasks__header">
            <h2 className="Dashboard__subtitle">Mes prochaines tâches</h2>
            <div className="tasks__header__actions">
              <button id="add-task-button" className="dashboard-button" type="button" onClick={() => setCreateTaskModalIsVisible(true)}>Ajouter une tâche</button>
            </div>
          </header>

          <main className="tasks__calendar">
            <TaskCalendar
              taskEvents={TaskMapper.toBigCalEvents(tasks)}
            />
          </main>
        </section>

        <section className="Dashboard__item sheets">
          <header>
            <h2 className="Dashboard__subtitle">Mes fiches favorites</h2>
            <div className="sheets__buttons">
              <button type="button" onClick={() => setSheetDisplayMode(SheetDisplayModes.CATEGORY)}>Par catégorie</button>
              <button type="button" onClick={() => setSheetDisplayMode(SheetDisplayModes.MONTH)}>Par mois</button>
            </div>
          </header>

          <main className="tasks__content">
            {sheetDisplayMode === SheetDisplayModes.MONTH
              && <FavoriteSheetsByMonth sheetList={favoriteSheets} />}
            {sheetDisplayMode === SheetDisplayModes.CATEGORY
              && <FavoriteSheetsByCategory sheetList={favoriteSheets} />}
          </main>
        </section>

        <Modal modalIsOpen={createTaskModalIsVisible} setModalIsOpen={setCreateTaskModalIsVisible}>
          <h2>Ajouter une tâche</h2>
          <form className="Modal__form" action="" onSubmit={handleSubmit(onSubmitNewTask)}>
            <label htmlFor="taskTitle">
              <p>Nom de la tâche</p>
              <input
                id="taskTitle"
                name="taskTitle"
                type="text"
                {...register(
                  'taskTitle',
                  {
                    required: true,
                    minLength: 8,
                  },
                )}
              />
              {errors.taskTitle && <p className="Modal__error">⚠ Tapez au moins 8 caractères pour le titre de la tâche</p>}
            </label>

            <label htmlFor="taskBegin">
              <p>Date de début</p>
              <input
                id="taskBegin"
                name="taskBegin"
                type="date"
                min={toDateInputFormat(new Date())}
                defaultValue={toDateInputFormat(new Date())}
                {...register(
                  'taskBegin',
                  {
                    required: true,
                    validate: (value) => new Date(value) <= new Date(getValues('taskEnd')),
                  },
                )}
              />
              {errors.taskBegin && <p className="Modal__error">⚠ La date de début doit être antérieure à la date de fin</p>}
            </label>

            <label htmlFor="taskEnd">
              <p>Date de fin</p>
              <input
                id="taskEnd"
                name="taskEnd"
                type="date"
                min={toDateInputFormat(new Date())}
                defaultValue={toDateInputFormat(new Date())}
                {...register(
                  'taskEnd',
                  {
                    required: true,
                  },
                )}
              />
            </label>
            <br />
            <button className="submitAddTask" type="submit"><PlusCircle /> Ajouter</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
