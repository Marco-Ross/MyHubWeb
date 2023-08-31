import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HubToastService } from 'src/app/global-shared/services/hub-toastr/hub-toastr.service';
import { FeedbackService } from './feedback.service';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';
import { Feedback, FeedbackPost } from './classes/feedback.class';
import { ProfileImageService } from 'src/app/global-shared/services/profile/profile-image.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';


@Component({
    selector: 'feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.scss']
})
export class FeedbackComponent
{
    constructor(private formBuilder: FormBuilder, private hubToast: HubToastService, private feedbackService: FeedbackService,
        private authenticationService: AuthenticationService, private profileImageService: ProfileImageService, private loggedInCookie: LoggedInCookie) { }

        faX = faX;

    //

    feedbackFG!: FormGroup;
    isLoading: boolean = false;
    isAdmin: boolean = false;
    feedbackLoading: boolean = false;
    isLoggedIn: boolean = false;
    feedback: Feedback[] | undefined = undefined;

    ngOnInit()
    {
        this.feedbackFG = this.formBuilder.group({
            feedback: ['', Validators.required]
        });

        this.isLoggedIn = !!this.loggedInCookie.GetLoggedInCookie();

        this.getUserFeedback();
    }

    private getUserFeedback()
    {
        let timeout = setTimeout(() => this.feedbackLoading = true, 180);

        this.authenticationService.getIsAdmin().subscribe({
            next: (response) =>
            {
                this.isAdmin = response.isAdmin;

                if (this.isAdmin)
                {
                    this.feedbackService.getFeedback().subscribe({
                        next: (response) =>
                        {
                            this.feedback = response.userFeedback;

                            clearTimeout(timeout);
                            this.feedbackLoading = false;
                        }
                    });
                }
                else
                {
                    clearTimeout(timeout);
                    this.feedbackLoading = false;
                }
            }
        });
    }

    //////

    postFeedback()
    {
        if (!this.feedbackFG.valid)
            return;

        this.feedbackService.postFeedback(new FeedbackPost(this.feedbackFG.get('feedback')?.value)).subscribe({
            next: () =>
            {
                this.hubToast.success('Thank you for your feedback!');
                this.feedbackFG.get('feedback')?.setValue('');
            },
            error: (error) =>
            {
                this.hubToast.error('Failed to post feedback', error);
            }
        });
    }

    getProfileImage(feedback: Feedback)
    {
        return this.profileImageService.GetUserProfileImageById(feedback.userId).subscribe({
            next: (image) =>
            {
                feedback.profileImage = URL.createObjectURL(image);
            }
        });
    }

    deleteComment(id: string, index: number)
    {
        this.feedbackService.deleteFeedback(id).subscribe({
            next: () =>
            {
                this.hubToast.success('Feedback comment deleted');
                this.feedback?.splice(index, 1);
            },
            error: (error) =>
            {
                this.hubToast.error('Failed to delete comment', error);
            }
        });
    }
}