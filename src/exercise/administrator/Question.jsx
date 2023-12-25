import IQuestion, { ITitle, IDescription } from './component/IQuestion'

const question =<IQuestion>
    <IQuestion>
        <ITitle>Q1</ITitle>
        <IDescription>IDescription Q1</IDescription>
        <IQuestion>
            <ITitle>1 1</ITitle>
            <IDescription>IDescription Q1 1</IDescription>
        </IQuestion>
        <IQuestion>
            <ITitle>1 2</ITitle>
        </IQuestion>   
        <IQuestion>
            <ITitle>1 3</ITitle>
        </IQuestion>                    
    </IQuestion>

    <IQuestion>
        <ITitle>Q2</ITitle>
        <IDescription>IDescription 1</IDescription>
    </IQuestion> 

    <IQuestion>
        <ITitle>Q3</ITitle>
        <IQuestion>
            <ITitle>Q3 1 </ITitle>
        </IQuestion>           
    </IQuestion>   

    <IQuestion>
        <ITitle>Q4</ITitle>
    </IQuestion>      

    <IQuestion>
        <ITitle>Q5</ITitle>

        <IQuestion>
            <ITitle>5 1</ITitle>
        </IQuestion>
        <IQuestion>
            <ITitle>5 2</ITitle>
        </IQuestion>   
        <IQuestion>
            <ITitle>5 3</ITitle>
        </IQuestion>  

    </IQuestion>  

</IQuestion> 

export default question