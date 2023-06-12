export interface IAlgorithms
{
    category: string;
    algorithms: Array<IAlgorithm>;
}

export interface IAlgorithm
{
    id: string;
    name: string;
    component: any;
    module: any;    
}