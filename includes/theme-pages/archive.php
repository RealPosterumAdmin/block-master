<?php get_header(); ?>

    <main>
        <h1><?php the_archive_title(); ?></h1>

        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <article>
                    <h2><?php the_title(); ?></h2>
                    <div><?php the_excerpt(); ?></div>
                    <a href="<?php the_permalink(); ?>">Read More</a>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p>No posts found.</p>
        <?php endif; ?>
    </main>

<?php get_footer(); ?>