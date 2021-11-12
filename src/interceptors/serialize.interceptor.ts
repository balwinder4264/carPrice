import {
UseInterceptors,
NestInterceptor,
ExecutionContext,
CallHandler,
Next
} from
"@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
//observer wors like middleware somehow
//decorators are just functions
interface ClassContructor {
    new (...args:any[]):{}
}
export function Serialize(dto:ClassContructor){
    return  UseInterceptors(new SerializerInterceptor(dto))
}

export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
        //Run something before request by the reqsuet handler
        // console.log("Im running before the handler")
        return handler.handle().pipe(
            map((data:any)=>{
                 //Run something before response  sent out
                // console.log("Im running After the handler")
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })

            })
        );
    }
}