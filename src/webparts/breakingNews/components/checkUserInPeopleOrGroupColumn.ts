import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "./pnpjs-config";
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { ISiteUserInfo } from "@pnp/sp/site-users";


export async function checkUserInPeopleOrGroupColumn(
  currentContext:WebPartContext,
  listTitle: string,
  columnName: string,
  user: ISiteUserInfo,
  IsDistributionList : boolean = false,
  isGroupColumn = false
): Promise<boolean> {
  try {
  
    const sp = getSP();
    console.log(listTitle,"-","-",columnName);

    const request = sp.web.lists.getByTitle(listTitle).items;
       
    const directMembershipItems = await request.select(`${columnName}/Id`).filter(
        `${columnName}/Id eq ${user.Id} ${IsDistributionList ? ` and (Title eq 'Breaking News')`:`` }`
    ).expand(columnName).top(1)();  

    console.log("directMembershipItems",directMembershipItems);
    if (directMembershipItems.length > 0) {
     return true;
    }

    if(isGroupColumn){
            const userGroups = await sp.web.currentUser.groups();
            const groupIds = userGroups.map(g => g.Id);

            if (groupIds.length > 0) {
                const filterQuery = groupIds.map((item,index)=>groupIds.length-1 !== index 
                                                                ? `${columnName}/Id eq ${item} or` 
                                                                : `${columnName}/Id eq ${item}`);

                let filterString = "(" + filterQuery.join(' ') + ")";
                if(IsDistributionList){
                    filterString = filterString +` and (Title eq 'Breaking News')`;
                }                                                
                console.log("filterString ", filterString)
                const groupMembershipItems = await request.select(`${columnName}/Id`)
                                                        .filter(filterString)
                                                        .expand(columnName)
                                                        .top(1)();
            
                console.log("groupMembershipItems ", groupMembershipItems);

                if (groupMembershipItems.length > 0) {
                    return true;
                }
            }

        
            const graphClient:MSGraphClientV3 = await currentContext.msGraphClientFactory.getClient('3');
            const o365Groups = await graphClient
            .api('/me/transitiveMemberOf/microsoft.graph.group?$count=true')
            .get();
            console.log("0365Groups ", o365Groups);           
            const o365GroupsIds = o365Groups.value.map((g:any) => g.id);
            console.log("o365GroupsIds ", o365GroupsIds);    
            if (o365GroupsIds.length > 0) {
                    const filterQuery = o365GroupsIds.map((item:string,index:number)=>groupIds.length-1 !== index 
                                    ? `(substringof('federateddirectoryclaimprovider|${item}',${columnName}/Name)) or` 
                                    : `(substringof('federateddirectoryclaimprovider|${item}',${columnName}/Name))`);

                    let filterString = "(" + filterQuery.join(' ') + ")";
                   
                    if(IsDistributionList){
                        filterString = filterString + ` and (Title eq 'Breaking News')`;
                    }   
                    console.log("O365FilterQuery ", filterString)

                    const o365MembershipItems = await request.select(`${columnName}/Name`).filter(filterString)
                    .expand(columnName).top(1)();
                    console.log("o365MembershipItems ", o365MembershipItems);   

                if (o365MembershipItems.length > 0) {
                    return true;
                }
            }
    }

    return false;

  } catch (error) {
    console.error("Error checking user in People or Group column:", error);
    throw new Error("Failed to check user existence in People or Group column.");
  }
}


