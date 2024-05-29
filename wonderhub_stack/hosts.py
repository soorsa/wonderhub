from django_hosts import patterns, host

host_patterns = patterns(
    '',
    host(r'www', 'wonderhub_stack.urls', name='www'),
    host(r'academy', 'blog.urls', name='academy'),
)