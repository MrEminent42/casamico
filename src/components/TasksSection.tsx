import { Database } from '../supabase/supabase'
import styled from 'styled-components';
import TaskCard from './Task';

const TasksSection = (props: {
    sectionLabel: string,
    tasks: Database['public']['Tables']['Tasks']['Row'][],
    handleClick: (task: Database['public']['Tables']['Tasks']['Row']) => any,
}) => {
    return (
        <TaskListSectionContainer>
            <SectionLabel>{props.sectionLabel}</SectionLabel>
            {
                props.tasks.map((task) => (
                    <TaskCard
                        key={task.task_id}
                        task={task}
                        handleClick={props.handleClick}
                    />
                ))
            }
        </TaskListSectionContainer>
    )
}

export default TasksSection



//container for the task list
const TaskListSectionContainer = styled.div`
    padding: 0;
    display: flex;
    align-items: left;
    flex-direction: column;
    gap: 10px;

    margin: 0 10px 10px 0;
`

const SectionLabel = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: #5F5F5F;
    margin: 5px 0;
    padding: 5px;
`