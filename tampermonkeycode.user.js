// ==UserScript==
// @name         Brighton Rock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Send nukes of love and start peace invasions during N-Day; created for the region of Greater Dienstad
// @author       CanineAnimal
// @match        *://www.nationstates.net/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict'

    if(!GM_getValue('shields')){
       GM_setValue('shields', []);
    }
    var shields = GM_getValue('shields');
    if(!GM_getValue('nukes')){
       GM_setValue('nukes', []);
    }
    var nukes = GM_getValue('nukes');
    var targetFac = GM_getValue('targetFac')
    GM_setValue('page', 0);
    if(!GM_getValue('pups')){
        var puppets = [];
        var passwords = [];
        var ask = true;
        var originalTime = (new Date()).getTime();
        while(ask){
            var str = prompt('Please enter your nation/puppet name. Follow it with the string ~/fin if you have inserted all your puppets/nations you will be using for N-Day. Enter the same string without any preceding text if you forgot to enter the string with your last puppet. To enter multiple nations, separate them with a comma character.').toLowerCase().replaceAll(' ', '_');
            if(str.indexOf('~/fin') == str.length - 5){
                ask = false;
            }
            if(str != '~/fin'){
                var pass = ('Insert password/s')
                for(var ptem = 0; ptem < str.split('~/')[0].split(',').length; ptem++){
                    var request = new XMLHttpRequest();
                    request.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?nation=' + str.split('~/')[0].split(',')[ptem], false);
                    while(originalTime > ((new Date()).getTime() + 6560)){};
                    request.send();
                    originalTime = (new Date()).getTime();
                    if(request.status == 404 || request.status == 400){
                        alert('No nation ' + str.split('~/')[0].split(',')[ptem] + ' exists.')
                    }else{
                        puppets[puppets.length] = str.split('~/')[0].split(',')[ptem];
                        passwords[passwords.length] = pass.split(',')[ptem];
                    }
                }
            }
        }
        GM_setValue('pups', puppets);
        GM_setValue('pass', passwords);
    }
    document.addEventListener('keyup', function(e){
        if(!e.altKey && !e.shiftKey && !e.ctrlKey && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA'){
            switch(e.keyCode){
                case 67:
                    if(prompt('Type in the string ~/Yes to confirm clearing all nation and password data.') == '~/Yes'){
                        // Clear password + puppet data
                        GM_deleteValue('pups');
                        GM_deleteValue('pass');
                    }
                    break
                case 70:
                    location.href = 'https://www.nationstates.net/page=faction/fid=616'
                    break
                case 74:
                    try{
                        document.querySelector('button[name=consider_join_faction]').click();
                    }catch(e){};
                    try{
                        document.querySelector('button[name=join_faction]').click();
                    }catch(e){};
                    break
                case 76:
                    try{
                        document.querySelector('button[name=consider_leave_faction]').click();
                    }catch(e){};
                    try{
                        document.querySelector('button[name=leave_faction]').click();
                    }catch(e){};
                    break
                case 80:
                    if(GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_')) == -1){
                        nukes[GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'))] = Number.parseInt(document.querySelector('.nukestat-nukes').innerText.split('\n')[0]);
                        shields[GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'))] = Number.parseInt(document.querySelector('.nukestat-shield').innerText.split('\n')[0]);
                        GM_setValue('shields', shields);
                        GM_setValue('nukes', nukes);
                    }
                    if(location.href.indexOf('/view=production') == -1){
                        location.href = 'https://www.nationstates.net/page=nukes/view=production';
                    }else{
                        var buts = document.querySelectorAll('.nukebuybutton');
                        if(buts.length > 0){
                            var specialty = document.querySelector('.fancylike').innerHTML;
                            var efficient = [0, 0];
                            for(var item = 0; item < buts.length; item++){
                                if(((specialty == 'Economic Specialist' || specialty == 'Strategic Specialist') && buts[item].value.split(':')[0] == 'shield') || ((specialty == 'Military Specialist' || specialty == 'Intel Specialist') && buts[item].value.split(':')[0] == 'nukes')){
                                    if(efficient[1] < (Number.parseFloat(buts[item].value.split(':')[1]))/(-1 * Number.parseFloat(buts[item].querySelector('.smalltext').innerHTML.split(' ')[0]))){
                                        efficient[0] = item;
                                        efficient[1] = (Number.parseFloat(buts[item].value.split(':')[1]))/(-1 * Number.parseFloat(buts[item].querySelector('.smalltext').innerHTML.split(' ')[0]))
                                    }
                                }
                            }
                            buts[efficient[0]].click();
                        }
                    }
                    break
                case 78:
                    buts = document.querySelectorAll('.nukebuybutton');
                    if(buts.length > 0){
                        efficient = [0, 0];
                        for(var jtem = 0; jtem < buts.length; jtem++){
                            if(buts[jtem].value.split(':')[0] == 'nukes'){
                                if(efficient[1] < (Number.parseFloat(buts[jtem].value.split(':')[1]))/(-1 * Number.parseFloat(buts[jtem].querySelector('.smalltext').innerHTML.split(' ')[0]))){
                                    efficient[0] = jtem;
                                    efficient[1] = (Number.parseFloat(buts[jtem].value.split(':')[1]))/(-1 * Number.parseFloat(buts[jtem].querySelector('.smalltext').innerHTML.split(' ')[0]))
                                }
                            }
                        }
                        buts[efficient[0]].click();
                    }
                    break;
                case 69:
                    buts = document.querySelectorAll('.nukebuybutton');
                    if(buts.length > 0){
                        efficient = [0, 0];
                        for(var ktem = 0; ktem < buts.length; ktem++){
                            if(buts[ktem].value.split(':')[0] == 'shield'){
                                if(efficient[1] < (Number.parseFloat(buts[ktem].value.split(':')[1]))/(-1 * Number.parseFloat(buts[ktem].querySelector('.smalltext').innerHTML.split(' ')[0]))){
                                    efficient[0] = ktem;
                                    efficient[1] = (Number.parseFloat(buts[ktem].value.split(':')[1]))/(-1 * Number.parseFloat(buts[ktem].querySelector('.smalltext').innerHTML.split(' ')[0]))
                                }
                            }
                        }
                        buts[efficient[0]].click();
                    }
                    break;
                case 83:
                    var loggedIn = false;
                    var nation = GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'));
                    if((location.href.indexOf('/page=nukes') != -1) && nation != -1){
                        nukes[GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'))] = Number.parseInt(document.querySelector('.nukestat-nukes').innerText.split('\n')[0]);
                        shields[GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'))] = Number.parseInt(document.querySelector('.nukestat-shield').innerText.split('\n')[0]);
                        GM_setValue('shields', shields);
                        GM_setValue('nukes', nukes);
                    }
                    if(location.href.indexOf('/view=incoming') != -1){
                        for(var ltem = 0; ltem < GM_getValue('shields').length; ltem++){
                            if(GM_getValue('shields')[(nation + ltem) % GM_getValue('pups').length] > 0){
                                document.querySelector('input[name=nation]').value = GM_getValue('pups')[(nation + ltem) % GM_getValue('pups').length];
                                document.querySelector('input[name=password]').value = GM_getValue('pass')[(nation + ltem) % GM_getValue('pups').length];
                                document.querySelector('button[value=Login]').click();
                                loggedIn = true;
                                break;
                            }
                        }if(!loggedIn){
                            document.querySelector('input[name=nation]').value = GM_getValue('pups')[(nation + 1) % GM_getValue('pups').length];
                            document.querySelector('input[name=password]').value = GM_getValue('pass')[(nation + 1) % GM_getValue('pups').length];
                            document.querySelector('button[value=Login]').click();
                        }
                    }else if(location.href.indexOf('/page=nukes?target=') != -1){
                        for(var otem = 0; otem < GM_getValue('nukes').length; otem++){
                            if(GM_getValue('nukes')[(nation + ltem) % GM_getValue('pups').length] > 0){
                                document.querySelector('input[name=nation]').value = GM_getValue('pups')[(nation + ltem) % GM_getValue('pups').length];
                                document.querySelector('input[name=password]').value = GM_getValue('pass')[(nation + ltem) % GM_getValue('pups').length];
                                document.querySelector('button[value=Login]').click();
                                loggedIn = true;
                                break;
                            }
                        }if(!loggedIn){
                            document.querySelector('input[name=nation]').value = GM_getValue('pups')[(nation + 1) % GM_getValue('pups').length];
                            document.querySelector('input[name=password]').value = GM_getValue('pass')[(nation + 1) % GM_getValue('pups').length];
                            document.querySelector('button[value=Login]').click();
                        }
                    }else{
                        document.querySelector('input[name=nation]').value = GM_getValue('pups')[(nation + 1) % GM_getValue('pups').length];
                        document.querySelector('input[name=password]').value = GM_getValue('pass')[(nation + 1) % GM_getValue('pups').length];
                        document.querySelector('button[value=Login]').click();
                    }
                    break
                case 73:
                    if(location.href.indexOf('/fid=') == -1 && location.href.indexOf('?fid=') == -1){
                        location.href = 'https://www.nationstates.net/page=faction/fid=616/view=incoming';
                    }else if(location.href.indexOf('/view=incoming') == -1){
                        location.href += '/view=incoming';
                    }else{
                        var inbound = document.querySelectorAll('.nukestats .nuketoken')
                        var options = [];
                        var nukesDiff = 1000000000000;
                        var nationID = GM_getValue('pups').indexOf(document.querySelector('.bellink').innerText.toLowerCase().replaceAll(' ', '_'));
                        if(inbound.length > 0){
                            if(GM_getValue('shields')[nationID] > 0){
                                for(var mtem = 0; mtem < Math.min(inbound.length, 20); mtem++){
                                    if((GM_getValue('shields')[nationID] - Number.parseInt(inbound[mtem].innerText.split(' ')[0])) < nukesDiff){
                                        nukesDiff = GM_getValue('shields')[nationID] - Number.parseInt(inbound[mtem].innerText.split(' ')[0]);
                                        options = [mtem];
                                    }if((GM_getValue('shields')[nationID] - Number.parseInt(inbound[mtem].innerText.split(' ')[0])) == nukesDiff){
                                        options[options.length] = mtem;
                                    }
                                }
                            }else{
                                for(var ntem = 0; ntem < Math.min(inbound.length, 20); ntem++){
                                    options[options.length] = ntem;
                                }
                            }
                            if(options.length > 0){
                                document.querySelectorAll('.button[name=defend]')[options[Math.floor(options.length * Math.random())]].click();
                            }
                        }
                    }
                    break
                case 86:
                    if(!targetFac){
                        targetFac = Number.parseInt(prompt('Enter the faction code to target; you will be provided this by an N-day commander.'));
                        GM_setValue('targetFac', targetFac);
                    }else{
                        location.href = 'https://www.nationstates.net/page=faction/fid=' + targetFac + '/view=nations'
                    }
                    break
                case 65:
                    if(document.querySelector('ol li:not(:has(.nukedestroyedicon)) a')){
                        location.href = document.querySelector('ol li:not(:has(.nukedestroyedicon)) a').href + '?target=' + document.querySelector('ol li:not(:has(.nukedestroyedicon)) a').href.split('nation=')[1].split('/')[0].split('?')[0];
                    }else if(location.href.indexOf('?start=') == -1){
                        GM_setValue('page', 50);
                        location.href += '?start=50'
                    }else{
                        GM_setValue('page', Number.parseInt(location.href.split('?start=')[1]) + 50);
                        location.href = location.href.split('?start=')[0] + (Number.parseInt(location.href.split('?start=')[1]) + 50)
                    }
                    break
                case 84:
                    var v = Number.parseInt(document.querySelector('a.nukestat[title=Radiation]').innerText.split('%')[0]) + Number.parseInt(document.querySelector('a.nukestat[title=Targeted]').innerText.split('\n')[0]) + Number.parseInt(document.querySelector('a.nukestat[title=Incoming]').innerText.split('\n')[0])
                    if(v > 150){
                        GM_setValue('page', GM_getValue('page') + 50);
                        location.href = location.href.split('?start=')[0] + GM_getValue('page');
                    }else{
                        document.querySelector('.button[name="nukes"]').click();
                    }
                    break
                case 85:
                    if(location.href.indexOf('/view=targets') == -1){
                        location.href = 'https://www.nationstates.net/page=nukes/view=targets';
                    }else if(document.querySelector('.button[name=launch]')){
                        document.querySelector('.button[name=launch]').click();
                    }
                    break
                case 79:
                    if(prompt('Confirm clearing of targeted faction by typing ~/Yes') == '~/Yes'){
                        GM_deleteValue('targetFac');
                    }
                    break
            }
        }
    }, false);
})();
