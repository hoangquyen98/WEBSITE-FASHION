import { Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/post.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthServiceCustomize } from 'src/app/core/services/auth.service';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  form: FormGroup;
  // Phan trang
  totalPosts = 10;
  postsPerPage = 4;
  currentPage = 1;
  pageSizeOptions = [ 4, 5, 6, 8, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  // Phan trang
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
