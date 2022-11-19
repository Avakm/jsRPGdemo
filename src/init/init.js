import * as layout from  './layout';

function init(hero,map){
        layout.createTop(hero,map);
        layout.createContent(hero);
        layout.createAlert();
        layout.createEquipinfo();
        layout.createBookinfo();
        layout.createShopinfo();
        layout.createNpcinfo();
        layout.createHelpinfo();
        layout.createMenu();
        layout.createEquipment(hero);
        layout.createOptions();
}

export  default init;
