import { PostsService } from 'src/app/core/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css']
})
export class PostManagementComponent implements OnInit, OnDestroy {
  displayedColumns = ['image', 'title', 'content', 'date', 'edit', 'delete'];
  posts: Post[] = [];
  totalPosts = 10;
  postsSub: Subscription;
  dataSource;
  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.postsService.getPostsAdmin();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        this.dataSource = new MatTableDataSource(this.posts);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
