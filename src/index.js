import './index.css';

const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.classList.add('copy-to-clipboard-textarea');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};

const generatorButton = document.getElementById('generatorButton');

const generateInvite = (event) => {
    event.preventDefault();

    try {
        const inviteInput = document.getElementById('inviteURL');
        const originalInvite = inviteInput.value;

        if (!/^https:\/\/discord.gg\/([a-zA-Z0-9])+$/.test(originalInvite)) {
            throw new Error('Invalid invite URL');
        }

        const originalInviteURL = new URL(originalInvite);
        const inviteCode = originalInviteURL.pathname.substring(1);
        const newInvite = `https://discord.omegaeliteclan.com?invite=${inviteCode}`;

        copyToClipboard(newInvite);
        inviteInput.value = newInvite;

        generatorButton.classList.add('success');
        generatorButton.innerHTML = 'Copied to clipboard';
        setTimeout(() => {
            generatorButton.classList.remove('success');
            generatorButton.innerHTML = 'Generate Invite';
        }, 2000);
    } catch (error) {
        console.error(error);
        generatorButton.classList.add('fail');
        generatorButton.innerHTML = 'Something went wrong';
        setTimeout(() => {
            generatorButton.classList.remove('fail');
            generatorButton.innerHTML = 'Generate Invite';
        }, 2000);
    }
};

generatorButton.addEventListener('click', generateInvite);
