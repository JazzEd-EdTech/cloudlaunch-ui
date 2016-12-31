import {__platform_browser_private__} from '@angular/platform-browser';
import { RequestOptions, RequestOptionsArgs, BaseRequestOptions, Headers } from '@angular/http';
import { Cloud } from '../../shared/models/cloud';
import { Credentials, OpenStackCredentials, AWSCredentials } from '../../shared/models/profile';

export class CustomRequestOptions extends BaseRequestOptions {
    // Partially based on: http://stackoverflow.com/questions/34494876/what-is-the-right-way-to-use-angular2-http-requests-with-django-csrf-protection
    credentials: Credentials = null;

    setCloudCredentials(credentials: Credentials) {
        this.credentials = credentials;
    }
    
    addCredentialHeaders(options: RequestOptionsArgs) {
        if (this.credentials && this.credentials.cloud) {
            if (this.credentials.id) {
                // Must be a saved set or credentials. Retrieve using ID
                options.headers.set('cl-credentials-id', this.credentials.id);
                return;
            }
            // Must be an unsaved set of credentials
            switch (this.credentials.cloud.cloud_type) {
                case 'openstack':
                    let os_creds = <OpenStackCredentials>this.credentials;
                    options.headers.set('cl-os-username', os_creds.username);
                    options.headers.set('cl-os-password', os_creds.password);
                    options.headers.set('cl-os-tenant-name', os_creds.tenant_name);
                    break;
                case 'aws':
                    let aws_creds = <AWSCredentials>this.credentials;
                    options.headers.set('cl-aws-access-key', aws_creds.access_key);
                    options.headers.set('cl-aws-secret-key', aws_creds.secret_key);
                    break;
            }
        }
    }

    getCookie(name) {
        return __platform_browser_private__.getDOM().getCookie(name);
    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        if (!options.headers)
            options.headers = new Headers();

        if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
            let auth_header = "Token " + sessionStorage.getItem('token') || localStorage.getItem('token');
            options.headers.set('Authorization', auth_header);
        }
        
        this.addCredentialHeaders(options);

        options.headers.set('X-CSRFToken', this.getCookie('csrftoken'));
        // Set the default content type to JSON
        if (!options.headers.get('Content-Type'))
            options.headers.set('Content-Type', 'application/json');
        return super.merge(options);
    }
}